"""Integration test: stale quarantine/rejected files from a previous run
are overwritten (not appended to) when the current run produces zero rows."""
import csv
import uuid

from etl.config import FIELDS, REASON_FIELDS, QUARANTINE_FILES, REJECTED_FILES
from etl.transform import transform_all


def _uid():
    return str(uuid.uuid4())


BATCH_ID = _uid()
CONTACT_ID = _uid()
CUSTOMER_ID = _uid()
PRODUCT_ID = _uid()
ORDER_ID = _uid()
LINE_ID = _uid()


def _make_row(table, *values):
    return dict(zip(FIELDS[table], values))


RAW_DATA = {
    "etl_batch": [_make_row("etl_batch",
        BATCH_ID, "test-run", "2024-01-01", "2024-01-01", "completed", "")],
    "contacts": [_make_row("contacts",
        CONTACT_ID, "a@b.com", "Alice", "123-456", "Usa",
        "1 Main St", "NY", "NY", "10001", "Acme", "Engineering", "Eng",
        "{}", "", "", "", "", "")],
    "customers": [_make_row("customers",
        CUSTOMER_ID, CONTACT_ID, "2024-01-01", "active", "b2b",
        "", "", "", "")],
    "products": [_make_row("products",
        PRODUCT_ID, "SKU-1", "Widget", "Electronics", "Acme",
        "10.00", "1", "{}", "", "", "", "")],
    "sales_orders": [_make_row("sales_orders",
        ORDER_ID, CUSTOMER_ID, "2024-01-01", "pending", "USD",
        "100.00", "", "", "", "")],
    "order_lines": [_make_row("order_lines",
        LINE_ID, ORDER_ID, PRODUCT_ID, "1", "2", "10.00")],
}


def _seed_csv(path, n_rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    headers = FIELDS[path.stem] + REASON_FIELDS
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(headers)
        for i in range(n_rows):
            w.writerow([f"stale-{i}"] * len(headers))


def _count_data_rows(path):
    if not path.exists():
        return 0
    with open(path) as f:
        return max(0, sum(1 for _ in f) - 1)


def test_stale_quarantine_overwritten(tmp_path, monkeypatch):
    """A stale quarantine/products.csv gets fully overwritten when the current
    run produces 0 quarantine rows for products."""
    stale = tmp_path / "quarantine" / "products.csv"
    _seed_csv(stale, 3)
    assert _count_data_rows(stale) == 3

    for tbl in QUARANTINE_FILES:
        monkeypatch.setitem(QUARANTINE_FILES, tbl, tmp_path / "quarantine" / f"{tbl}.csv")
    for tbl in REJECTED_FILES:
        monkeypatch.setitem(REJECTED_FILES, tbl, tmp_path / "rejected" / f"{tbl}.csv")

    result = transform_all(RAW_DATA)

    assert len(result["products"]["quarantine"]) == 0
    assert _count_data_rows(stale) == 0, (
        f"Stale quarantine file should have 0 data rows after transform, "
        f"got {_count_data_rows(stale)}"
    )


def test_stale_rejected_overwritten(tmp_path, monkeypatch):
    """A stale rejected/sales_orders.csv gets fully overwritten when the current
    run produces 0 rejected rows for sales_orders."""
    stale = tmp_path / "rejected" / "sales_orders.csv"
    _seed_csv(stale, 3)
    assert _count_data_rows(stale) == 3

    for tbl in QUARANTINE_FILES:
        monkeypatch.setitem(QUARANTINE_FILES, tbl, tmp_path / "quarantine" / f"{tbl}.csv")
    for tbl in REJECTED_FILES:
        monkeypatch.setitem(REJECTED_FILES, tbl, tmp_path / "rejected" / f"{tbl}.csv")

    result = transform_all(RAW_DATA)

    assert len(result["sales_orders"]["rejected"]) == 0
    assert _count_data_rows(stale) == 0, (
        f"Stale rejected file should have 0 data rows after transform, "
        f"got {_count_data_rows(stale)}"
    )

"""Test that clean + quarantine + rejected == raw rows for each table."""
from etl.transform import _t_products


def test_products_row_count_invariant():
    rows = [
        {"product_id": "11111111-1111-1111-1111-111111111111",
         "sku": "SKU-A", "product_name": "A", "category": "", "brand": "",
         "list_price": "10.00", "is_active": "1", "attributes_json": "{}",
         "created_at": "", "updated_at": "", "etl_batch_id": "",
         "source_system": "", "source_record_id": ""},
        {"product_id": "22222222-2222-2222-2222-222222222222",
         "sku": "SKU-B", "product_name": "B", "category": "", "brand": "",
         "list_price": "20.00", "is_active": "1", "attributes_json": "{}",
         "created_at": "", "updated_at": "", "etl_batch_id": "",
         "source_system": "", "source_record_id": ""},
        {"product_id": "33333333-3333-3333-3333-333333333333",
         "sku": "SKU-C", "product_name": "C", "category": "", "brand": "",
         "list_price": "30.00", "is_active": "1", "attributes_json": "{}",
         "created_at": "", "updated_at": "", "etl_batch_id": "",
         "source_system": "", "source_record_id": ""},
        {"product_id": "44444444-4444-4444-4444-444444444444",
         "sku": "SKU-D", "product_name": "D", "category": "", "brand": "",
         "list_price": "-5.00", "is_active": "1", "attributes_json": "{}",
         "created_at": "", "updated_at": "", "etl_batch_id": "",
         "source_system": "", "source_record_id": ""},
        {"product_id": "", "sku": "SKU-E", "product_name": "E",
         "category": "", "brand": "", "list_price": "50.00", "is_active": "1",
         "attributes_json": "{}", "created_at": "", "updated_at": "",
         "etl_batch_id": "", "source_system": "", "source_record_id": ""},
    ]
    clean, quarantine, rejected = _t_products(rows)
    assert len(clean) == 3
    assert len(quarantine) == 1
    assert len(rejected) == 1
    total = len(clean) + len(quarantine) + len(rejected)
    assert total == len(rows), (
        f"products: clean({len(clean)}) + quarantine({len(quarantine)}) "
        f"+ rejected({len(rejected)}) = {total}, expected {len(rows)}"
    )

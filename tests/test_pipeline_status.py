"""Test that run_pipeline derives the correct summary status for all 4
combinations of validation.passed / reconcile.all_passed."""
from unittest.mock import Mock


def _mock_run(monkeypatch, validation_passed, reconciled_passed):
    """Run the pipeline with mocked stage functions and return the summary."""
    monkeypatch.setattr("etl.main.extract_all", lambda: {})
    monkeypatch.setattr("etl.main.transform_all", lambda x: {})

    val = Mock()
    val.passed = validation_passed
    val.checks = []
    monkeypatch.setattr("etl.main.validate_all", lambda x, val=val: val)

    monkeypatch.setattr("etl.main.load_all", lambda x, skip_db=False: {})

    rec = Mock()
    rec.checks = [{"passed": reconciled_passed}]
    monkeypatch.setattr("etl.main.reconcile_all", lambda rec=rec: rec)

    from etl.main import run_pipeline
    return run_pipeline(skip_db=True)


def test_status_completed(monkeypatch):
    summary = _mock_run(monkeypatch, validation_passed=True, reconciled_passed=True)
    assert summary["status"] == "completed", summary["status"]


def test_status_completed_with_warnings(monkeypatch):
    summary = _mock_run(monkeypatch, validation_passed=False, reconciled_passed=True)
    assert summary["status"] == "completed_with_warnings", summary["status"]


def test_status_completed_with_errors_on_reconcile_fail(monkeypatch):
    summary = _mock_run(monkeypatch, validation_passed=True, reconciled_passed=False)
    assert summary["status"] == "completed_with_errors", summary["status"]


def test_status_completed_with_errors_both_fail(monkeypatch):
    summary = _mock_run(monkeypatch, validation_passed=False, reconciled_passed=False)
    assert summary["status"] == "completed_with_errors", summary["status"]

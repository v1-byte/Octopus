Live Test Bridge

Private environment variables: LIVE_TEST_UPSTREAM_URL, LIVE_TEST_APPLY_PATH, LIVE_TEST_REVOKE_PATH, LIVE_TEST_UPSTREAM_TOKEN, LIVE_TEST_OPERATOR_PASSWORD, LIVE_TEST_SESSION_SECRET, LIVE_TEST_ALLOWED_ORIGIN.

Run with node server/live-test-bridge.mjs. A/C uses /api/live-test/status, /session, /apply, and /revoke on the same origin.

The bridge accepts only mode live-test, limits 1-50 symbols, exactly five weights per symbol, integer seed, and 1000-100000 samples. Sessions expire in 15 minutes and password attempts are rate limited.

Use only tester accounts. The upstream test hook must enforce expiry, audit logging, and a kill switch, and must ignore test profiles for normal players.

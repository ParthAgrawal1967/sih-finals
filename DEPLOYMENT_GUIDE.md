# Deployment Guide - Tariff Simulation Builder

## Quick Fix Summary

The 500 error on `/simulate` endpoint was caused by:
1. **Incorrect file paths** - Backend looking for models/data in wrong directory
2. **Request validation error** - Frontend sending fields that backend didn't accept
3. **Missing error logging** - Couldn't debug issues on deployed server

**Fixed in `backend/app.py`**

---

## Backend Deployment on Render

### 1. Push Latest Code
```bash
git add -A
git commit -m "Fix: Correct file paths and request validation for simulate endpoint"
git push origin main
```

### 2. Verify Render Deployment
- Go to Render dashboard
- Check build logs for any errors
- Look for startup messages with debug info

### 3. Test Backend Health
```bash
curl https://your-render-url.onrender.com/
```
Should return:
```json
{
  "status": "ok",
  "startup_error": null
}
```

### 4. Troubleshoot if Still Errors
If `startup_error` is not null, check the Render logs for debug output showing:
- File paths being used
- Which file is missing
- Detailed error message

---

## Frontend Deployment on Vercel

### 1. Set Environment Variable
In Vercel dashboard > Your Project > Settings > Environment Variables

**Add this variable:**
```
VITE_REACT_API_BASE_URL = https://your-render-backend-url.onrender.com
```

Example:
```
VITE_REACT_API_BASE_URL = https://sih-api.onrender.com
```

### 2. Redeploy Frontend
Any environment variable change triggers automatic redeployment, or manually redeploy:
- Go to Deployments
- Click the 3-dots menu
- Select "Redeploy"

### 3. Verify in Browser
Open the deployed frontend and test Tariff Simulation Builder:
1. Set tariff percentage
2. Set time horizon
3. Click "Run Simulation"
4. Should see results instead of error

---

## Testing /simulate Endpoint

### Local Development
```bash
cd backend
python -m uvicorn app:app --reload
```

Test the endpoint:
```bash
curl -X POST http://127.0.0.1:8000/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "tariff_pct": 20,
    "horizon_months": 12,
    "farmer_margin_pct": 10
  }'
```

### Production (Render)
```bash
curl -X POST https://your-render-url.onrender.com/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "tariff_pct": 20,
    "horizon_months": 12,
    "farmer_margin_pct": 10
  }'
```

---

## File Structure Verification

Backend expects this structure:
```
backend/
├── app.py
├── models/
│   ├── global/
│   │   ├── cpo_lstm_model.h5
│   │   └── data_scaler.pkl
│   └── indian/
│       └── xgb_gen11_imports_tonnes.json
└── data/
    ├── global_dataset.csv
    ├── india_cpo_clean_ml_dataset_gen11_with_landed.csv
    ├── processed_X.npy
    └── processed_y.npy
```

Or alternatively in root:
```
root/
├── backend/
└── models/
└── data/
```

---

## Environment Variables Needed

### Backend (Render)
No special env vars needed for basic operation. Optional:
- `NMEO_STATEWISE_SOURCE_URL` - External data source URL
- `PORT` - Port number (Render sets automatically)

### Frontend (Vercel)
- `VITE_REACT_API_BASE_URL` - Backend API URL

---

## Common Issues & Solutions

### Issue: 500 on /simulate
**Check:**
1. `/` endpoint returns startup_error
2. Render logs for initialization errors
3. Files exist in backend/models and backend/data

### Issue: CORS Error
**Solution:** Already configured with CORS middleware:
```python
allow_origins=["*"]
allow_methods=["*"]
```

### Issue: 404 on Backend API
**Check:**
1. Render deployment URL is correct
2. Environment variable in Vercel matches
3. Backend is actually deployed and running

### Issue: Timeout
**Check:**
1. Render free tier has startup time limits
2. Initial model loading may take 30+ seconds
3. Consider upgrading to paid plan if timeouts persist

---

## Monitoring

### Check Startup Logs
Render > Services > Your Service > Logs
Look for:
```
DEBUG: GLOBAL_MODEL_PATH = ...
DEBUG: All models and data loaded successfully
```

### Monitor Requests
Render shows request logs:
- Status codes
- Response times
- Errors

### Browser DevTools
In frontend browser console (F12):
- Check Network tab for API requests
- Look at response bodies for error details
- Console shows any fetch errors

---

## Next Steps

1. Push the fixed code to GitHub
2. Render auto-deploys (watch logs)
3. Set environment variable in Vercel
4. Wait 2-3 minutes for Vercel to redeploy
5. Test the Tariff Simulation Builder
6. Monitor logs for any remaining issues

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/)
- [Pydantic Models](https://docs.pydantic.dev/latest/)

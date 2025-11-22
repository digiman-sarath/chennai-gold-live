# Chennai Gold Rate Website

A full-stack gold rate tracking website with real-time updates, admin panel, and automated daily price updates.

## Features

### 🌟 Public Features
- **Real-time Gold Prices**: Live 22K and 24K gold rates per gram
- **Price History Chart**: Interactive chart showing 30-day price trends
- **Price Breakdown Table**: Prices for 1g, 8g (sovereign), 10g, and 100g
- **SEO Optimized**: Full meta tags, structured data, and semantic HTML
- **Auto-refresh**: Prices update automatically when changed

### 🔒 Admin Features
- **Secure Authentication**: Email/password login system
- **Role-based Access**: Admin-only dashboard
- **Price Management**: Easy form to update daily gold prices
- **Protected Routes**: Access control with Row Level Security

### ⚙️ Backend Features
- **Lovable Cloud Database**: PostgreSQL with RLS policies
- **Real-time Subscriptions**: Instant UI updates
- **Scheduled Updates**: Automated daily price updates via cron
- **Edge Functions**: Serverless API endpoints

## Setup Instructions

### 1. Create Your First Admin User

After deploying, you need to create an admin user:

1. Visit `/auth` and sign up for an account
2. Go to Lovable Cloud → Database → Tables → user_roles
3. Insert a new row:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('your-user-id-from-auth-users-table', 'admin');
   ```
4. Sign in at `/auth` and you'll have admin access

### 2. Update Gold Prices

Two ways to update prices:

#### Method 1: Admin Dashboard (Recommended)
1. Sign in at `/auth`
2. Navigate to Admin Dashboard
3. Fill in the form with date and prices
4. Submit to update

#### Method 2: Edge Function
Call the `update-gold-price` function:
```bash
curl -X POST https://your-project.supabase.co/functions/v1/update-gold-price \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "date": "2025-11-22",
    "price_22k": 5850.00,
    "price_24k": 6380.00
  }'
```

### 3. Automated Daily Updates

A cron job runs daily at 9:00 AM IST (3:30 AM UTC) to update prices. 

**To customize the scheduled prices:**
1. Go to Lovable Cloud → Database → SQL Editor
2. Update the cron job prices:
```sql
SELECT cron.unschedule('daily-gold-price-update');

SELECT cron.schedule(
  'daily-gold-price-update',
  '30 3 * * *',
  $$
  SELECT
    net.http_post(
        url:='YOUR_EDGE_FUNCTION_URL',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
        body:=json_build_object(
          'date', CURRENT_DATE::text,
          'price_22k', YOUR_22K_PRICE,
          'price_24k', YOUR_24K_PRICE
        )::jsonb
    ) as request_id;
  $$
);
```

**Note:** For production, you'll want to integrate with a real gold price API instead of static values.

## Database Schema

### gold_prices
- `id`: UUID (Primary Key)
- `date`: DATE (Unique)
- `price_22k_per_gram`: DECIMAL
- `price_24k_per_gram`: DECIMAL
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### user_roles
- `id`: UUID (Primary Key)
- `user_id`: UUID (References auth.users)
- `role`: app_role ENUM ('admin', 'user')
- `created_at`: TIMESTAMP

## Routes

- `/` - Public homepage with current prices and chart
- `/auth` - Login/Signup page
- `/admin` - Admin dashboard (protected)

## SEO Features

- Dynamic title with current date
- Meta descriptions with keywords
- Open Graph tags for social sharing
- Structured data (JSON-LD) for search engines
- Canonical URLs
- Semantic HTML elements

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Charts**: Recharts
- **Auth**: Supabase Auth
- **Database**: PostgreSQL with RLS
- **Scheduling**: pg_cron

## Security

- Row Level Security (RLS) policies
- Admin role-based access control
- Security definer functions to prevent recursive RLS
- Email confirmation enabled for signups
- Protected admin routes

## Deployment

Frontend changes deploy when you click "Update" in the publish dialog.
Backend changes (edge functions, database migrations) deploy automatically.

## Future Enhancements

- Integrate with live gold price API
- Email notifications for price alerts
- Historical data export
- Multi-city support
- Price comparison charts
- Mobile app version

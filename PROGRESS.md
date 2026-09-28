# OfficeDesk — Progress Tracker

এই ফাইলটা প্রতিটা নতুন session-এর শুরুতে দেখা হবে, যাতে আগের কাজের ধারাবাহিকতা বজায় থাকে। নিয়মকানুনের জন্য দেখুন [CLAUDE.md](CLAUDE.md), ব্যবসায়িক স্পেসিফিকেশনের জন্য [requirment.md](requirment.md)।

## নোট: SRS-এর Module vs আমাদের build order
`requirment.md`-এর "Module 1" আসলে **Employee Onboarding**, Login/Auth কোনো আলাদা SRS module না — এটা সবকিছুর আগে দরকারি একটা প্রি-রিকুইজিট স্ক্রিন। তাই নিচের ট্র্যাকারে Login কে "Auth Screen" হিসেবে আলাদা দেখানো হলো, তারপর SRS-এর Module ১–৮ ক্রমানুসারে আসবে।

## Build Order (প্রতিটা module-এর জন্য)
Static UI → Backend → Frontend-Backend Integration — প্রতিটা module নিজের মধ্যে এই ছোট cycle সম্পূর্ণ করবে, পুরো প্রজেক্টের জন্য একবারে না।

## Tech Stack Decisions (Auth Screen backend শুরু করার সময় চূড়ান্ত হয়েছে)
- **Database:** PostgreSQL, hosted on **Neon** (managed, free tier, company data দীর্ঘমেয়াদী safe রাখার জন্য)
- **ORM:** Prisma
- **Auth:** Auth.js (NextAuth), Credentials provider
- **Login flow:** Admin employee profile বানানোর সময় initial/temporary password সেট করে; Employee login-এর পর profile settings থেকে password change করতে পারবে। Plain-text password কখনো store হবে না — শুধু hash (`password_hash` field, `requirment.md` v1.3-এ যোগ হয়েছে)।

---

## ✅ Auth Screen — Login Page

**Status: Static UI সম্পূর্ণ (Backend/Integration বাকি)**

- Route: `src/app/login/page.tsx` + `src/app/login/_components/LoginForm.tsx`
- Design reference: `designs/module1/` (Desktop 1440, Tablet 768, Mobile 375 + ৪টা state variant)
- করা হয়েছে:
  - Semantic form (label/input association, placeholder vs label, void elements ইত্যাদি শিখে শিখে করা)
  - Mobile → Tablet → Desktop — তিনটা breakpoint অনুযায়ী responsive layout (Tailwind mobile-first)
  - Calendar illustration (`src/assets/LoginIllustrator.png`) `next/image` দিয়ে যোগ করা, breakpoint অনুযায়ী position/size আলাদা
  - Copyright footer (mobile/tablet-এ page bottom-এ, desktop-এ banner-এর ভিতরে)
- বাকি আছে (পরে "interactivity/state" module-এ):
  - Password show/hide টগল কাজ করানো (এখন শুধু icon বসানো আছে)
  - `href=""` খালি লিংকগুলো (Forgot password, Contact admin) — routing module-এ ঠিক হবে
  - ৪টা state variant (Focused input, Error, Loading, Account locked) — এখনো implement করা হয়নি
  - Backend API (actual authentication) + frontend integration

---

## ⬜ Module 1: Employee Onboarding / Initial Setup
Status: শুরু হয়নি (folder scaffold আছে: `src/app/admin/`, `src/types/employee.ts`)

## ⬜ Module 2: Weekly Plan Declaration
Status: শুরু হয়নি

## ⬜ Module 3: Daily Attendance (Check-in / Check-out)
Status: শুরু হয়নি (folder scaffold আছে: `src/app/attendance/`)

## ⬜ Module 4: Leave Management (Self-Declaration)
Status: শুরু হয়নি (folder scaffold আছে: `src/app/leave/`)

## ⬜ Module 5: Fine Policy
Status: শুরু হয়নি

## ⬜ Module 6: Chef Meal-Count Notification (SMS)
Status: শুরু হয়নি

## ⬜ Module 7: Team Lead — Team Visibility (View-only)
Status: শুরু হয়নি

## ⬜ Module 8: Admin Dashboard
Status: শুরু হয়নি

---

## Shared UI Components (scaffolded, খালি)
`src/components/ui/Button.tsx`, `Card.tsx`, `Input.tsx`, `Modal.tsx` — এখনো implement করা হয়নি। যখন একাধিক module-এ একই UI pattern লাগবে (যেমন LoginForm-এর input style), তখন এগুলোতে re-usable করে তোলার কথা ভাবা হবে।

## পরবর্তী session শুরু করার সময়
শুধু বলবেন: *"PROGRESS.md দেখে continue করো"* — অথবা নির্দিষ্ট module-এর নাম বলে দিলেই হবে।

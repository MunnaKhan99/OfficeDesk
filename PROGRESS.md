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

**Status: Backend সম্পূর্ণ ও টেস্টেড (Frontend Integration বাকি)**

- Route: `src/app/login/page.tsx` + `src/app/login/_components/LoginForm.tsx`
- Design reference: `designs/module1/` (Desktop 1440, Tablet 768, Mobile 375 + ৪টা state variant)
- Static UI-তে করা হয়েছে:
  - Semantic form (label/input association, placeholder vs label, void elements ইত্যাদি শিখে শিখে করা)
  - Mobile → Tablet → Desktop — তিনটা breakpoint অনুযায়ী responsive layout (Tailwind mobile-first)
  - Calendar illustration (`src/assets/LoginIllustrator.png`) `next/image` দিয়ে যোগ করা, breakpoint অনুযায়ী position/size আলাদা
  - Copyright footer (mobile/tablet-এ page bottom-এ, desktop-এ banner-এর ভিতরে)
- Backend-এ করা হয়েছে:
  - Neon (PostgreSQL) database সংযুক্ত, `.env`-এ `DATABASE_URL` সেট
  - Prisma ORM সেটআপ (`prisma7.config.ts`, stable version `7.10.0` pin করা — RC version এড়ানো হয়েছে)
  - `Employee` model ও `Role` enum migration করে database-এ table তৈরি
  - `src/lib/prisma.ts` — singleton Prisma Client (`@prisma/adapter-pg` driver adapter সহ, Prisma 7-এর নতুন pattern)
  - `bcryptjs` দিয়ে password hashing
  - `prisma/seed.ts` দিয়ে প্রথম test Admin user database-এ ঢোকানো হয়েছে (password `.env`-এর `SEED_ADMIN_PASSWORD` থেকে, hardcoded না)
  - `src/auth.ts` — Auth.js (NextAuth v5-beta) কনফিগার, Credentials provider দিয়ে email+password verify logic
  - `src/app/api/auth/[...nextauth]/route.ts` — Auth.js-এর API route
  - `jwt`/`session` callbacks দিয়ে `role` ও `id` custom field session-এ propagate করা, `src/types/next-auth.d.ts`-এ TypeScript module augmentation
  - Manual QA টেস্ট পাস: সঠিক credential দিয়ে login → session-এ role সহ সব তথ্য আসে; ভুল password ও অস্তিত্বহীন email → দুটোই ঠিকভাবে reject হয়
- বাকি আছে:
  - Frontend Integration: static `LoginForm`-কে Auth.js-এর `signIn()`-এর সাথে যুক্ত করা
  - Middleware দিয়ে protected route তৈরি (login ছাড়া `/attendance`, `/leave` ইত্যাদিতে ঢোকা আটকানো)
  - Login-এর ৪টা UI state variant (Focused, Error, Loading, Account locked) বাস্তবায়ন
  - Password show/hide টগল কার্যকর করা
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

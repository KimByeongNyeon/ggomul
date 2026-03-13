-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nickname" VARCHAR(50),
    "avatar_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_accounts" (
    "user_id" TEXT NOT NULL,
    "github_id" VARCHAR(50),
    "github_login" VARCHAR(50),
    "repo_count" INTEGER,
    "followers" INTEGER,
    "total_commits" INTEGER,
    "current_streak" INTEGER,
    "languages" JSONB,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "github_accounts_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "solved_accounts" (
    "user_id" TEXT NOT NULL,
    "solved_handle" VARCHAR(50),
    "tier" INTEGER,
    "rating" INTEGER,
    "solved_count" INTEGER,
    "streak" INTEGER,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "solved_accounts_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_stats" (
    "user_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "character_stage" VARCHAR(30),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_stats_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" VARCHAR(30),
    "value" INTEGER,
    "exp" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_contributions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "contribution_count" INTEGER,

    CONSTRAINT "github_contributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solved_problems" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "problem_id" INTEGER NOT NULL,
    "tier" INTEGER,
    "algorithm_tags" TEXT[],
    "solved_at" TIMESTAMPTZ,

    CONSTRAINT "solved_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "algorithm_stats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "algorithm" VARCHAR(50) NOT NULL,
    "solved_count" INTEGER,
    "avg_tier" DOUBLE PRECISION,

    CONSTRAINT "algorithm_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_problems" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "problem_id" INTEGER NOT NULL,
    "algorithm" VARCHAR(50),
    "tier" INTEGER,
    "reason" TEXT,

    CONSTRAINT "recommended_problems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_accounts_github_id_key" ON "github_accounts"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_accounts_github_login_key" ON "github_accounts"("github_login");

-- CreateIndex
CREATE UNIQUE INDEX "solved_accounts_solved_handle_key" ON "solved_accounts"("solved_handle");

-- CreateIndex
CREATE INDEX "activity_logs_user_id_created_at_idx" ON "activity_logs"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "github_contributions_user_id_date_idx" ON "github_contributions"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "github_contributions_user_id_date_key" ON "github_contributions"("user_id", "date");

-- CreateIndex
CREATE INDEX "solved_problems_user_id_solved_at_idx" ON "solved_problems"("user_id", "solved_at");

-- CreateIndex
CREATE UNIQUE INDEX "solved_problems_user_id_problem_id_key" ON "solved_problems"("user_id", "problem_id");

-- CreateIndex
CREATE INDEX "algorithm_stats_user_id_idx" ON "algorithm_stats"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "algorithm_stats_user_id_algorithm_key" ON "algorithm_stats"("user_id", "algorithm");

-- CreateIndex
CREATE INDEX "recommended_problems_user_id_idx" ON "recommended_problems"("user_id");

-- AddForeignKey
ALTER TABLE "github_accounts" ADD CONSTRAINT "github_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solved_accounts" ADD CONSTRAINT "solved_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_contributions" ADD CONSTRAINT "github_contributions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solved_problems" ADD CONSTRAINT "solved_problems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "algorithm_stats" ADD CONSTRAINT "algorithm_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommended_problems" ADD CONSTRAINT "recommended_problems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "book_review" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "buyUrl" TEXT,
    "content" TEXT NOT NULL,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "book_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "bookReviewId" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("userId","bookReviewId")
);

-- AddForeignKey
ALTER TABLE "book_review" ADD CONSTRAINT "book_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_bookReviewId_fkey" FOREIGN KEY ("bookReviewId") REFERENCES "book_review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

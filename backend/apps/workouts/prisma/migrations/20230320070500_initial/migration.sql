-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL DEFAULT 'unknown.jpg',
    "experience" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "trainingTime" TEXT NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "workoutVideo" TEXT NOT NULL DEFAULT 'unknown.mp4',
    "rating" INTEGER NOT NULL DEFAULT 0,
    "coachId" TEXT NOT NULL,
    "isSpecialOffer" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

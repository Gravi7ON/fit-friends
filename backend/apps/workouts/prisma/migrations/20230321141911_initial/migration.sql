-- CreateTable
CREATE TABLE "OrderWorkout" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "cusromerId" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "amountWorkout" INTEGER NOT NULL,
    "sum" INTEGER NOT NULL,
    "payment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderGym" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "gymId" INTEGER NOT NULL,
    "cusromerId" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "amountSubscription" INTEGER NOT NULL,
    "sum" INTEGER NOT NULL,
    "payment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderGym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderWorkout" ADD CONSTRAINT "OrderWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderGym" ADD CONSTRAINT "OrderGym_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

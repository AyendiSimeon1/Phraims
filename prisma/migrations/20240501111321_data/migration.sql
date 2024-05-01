-- CreateTable
CREATE TABLE "FetchedData" (
    "id" SERIAL NOT NULL,
    "searchItem" TEXT,
    "firstNameOne" TEXT,
    "lastNameOne" TEXT,
    "emailOne" TEXT,
    "firstNameTwo" TEXT,
    "lastNameTwo" TEXT,
    "emailTwo" TEXT,
    "firstNameThree" TEXT,
    "lastNameThree" TEXT,
    "emailThree" TEXT,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FetchedData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FetchedData" ADD CONSTRAINT "FetchedData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

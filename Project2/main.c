#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <time.h>

struct stat stat1, stat2;
struct tm *time1, *time2;

void filestat1(void);
void filestat2(void);
void filetime1(void);
void filetime2(void);
void sizecmp(void);
void blockcmp(void);
void datecmp(void);
void timecmp(void);

int main(void)
{
	filestat1();
	filestat2();
	filetime1();
	filetime2();
	sizecmp();
	blockcmp();
	datecmp();
	timecmp();
	
	
	return 0;
}

void filestat1(void){
}
void filestat2(void){
}
void filetime1(void){
}
void filetime2(void){
}
void sizecmp(void){
}
void blockcmp(void){
   int blk1 = &stat1.st_blocks;
   int blk2 = &stat2.st_blocks;

   printf("block compare\n");

   if(blk1 > blk2)
      printf("text1 is bigger\n");
   else if(blk2 > blk1)
      printf("text2 is bigger\n");
   else
      printf("sizes are equal\n");

   printf("\n");

}
void datecmp(void){
}
void timecmp(void){
}


#include<stdio.h>
int main(){
int arr[3][3];
int i,j;
for(i=0;i<3;i++)
{
for(j=0;j<3;j++)
{
printf("enter element at [%d][%d]:",i,j);
scanf("%d",&arr[i][j]);
}
}
printf("\n the 3x3 array is\n");
for(i=0;i<3;i++)
{
for(j=0;j<3;j++)
{
printf("%d\t",arr[i][j]);
}
printf("\n");
}
return 0;
}

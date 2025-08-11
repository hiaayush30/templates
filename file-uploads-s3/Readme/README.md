## Setting up S3
### refer https://www.nexttonone.lol/upload-s3
- allowing anyone/anything to be able to get sth from the s3 bucket
![alt text](image.png)
![alt text](image(1).png)
![alt text](image-1.png)
![alt text](image-2.png)

- now create credentials to give our app permission to access this bucket
![alt text](image-3.png)
- users in IAM can be real life users (with username and password) or they can apps that have access key and secret key
![alt text](image-4.png)
- you can give AmazonS3FullAccess but this would allow user or app to create and delete entire buckets or objects inside buckets so click on create policy

![alt text](image-5.png)
![alt text](image-6.png)
- allowing only putObject and deleteObject
![alt text](image-7.png)
- click on add arn
![alt text](image-8.png)
- allows any file in this specific bucket to be created or deleted
- click on add arn and then on next
![alt text](image-9.png)
- click on create policy and then go back to  policies tab and refresh it
![alt text](image-10.png)
- click on next and then on create user
![alt text](image-11.png)
- you have a new user and now you want the access keys 🙂
![alt text](image-12.png)
![alt text](image-13.png)
![alt text](image-14.png)
---
- we can't give the client the complete access to s3 else they will be able to upload delete anything in the bucket
- so instead we will communicate with our server which will generate a unique url which allows uploading of only that individual file and then the handleSubmit() can send this file to S3

```
npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```
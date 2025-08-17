## API Documentation 
https://github.com/marcosyu/bv-expense-monitoring/wiki/API-Documentation
## Architecture Decisions:
1. Used https://github.com/akhil-gautam/nextjs-on-rails as a starting point as it mostly contain the functionality and technology requirements.
2. Decided to use docker to run the app for several reasons:
 - To avoid any OS dependencies on the versions of the packages and gems.
 - To have minimal changes and setup in the scenario that we want to deploy this app.
 - I'm using windows in developing this app
3. Sensitive ENV vars are hard coded on the dockerfile. In the scenario that we want to deploy this app we can move the env vars on the platform that we could use so that it could be properly maintained and protected
4. Only reviewer can add new users
5. User update does not require password but when you do key in a new password it should update the old one
6. Submitted expenses cannot be updated or deleted
7. Approval and Rejection of expenses are final

## How to Run:
1. Ensure you have Docker and Docker Compose installed and running on your system.
2. Open a terminal or command prompt.
3. Navigate to the expense-monitoring directory
4. Start the application using the following command:
   ```
   docker compose up
   ```
5. To stop the application, use the following command:
   ```
   docker compose down
   ```
6. Once DB and server is running you can attach to the instance and run
   ```
   rails db:migrate
   rails db:seed
   ```
## Dev Notes
Working with docker:
1. Updating rails credentials.
```docker exec -it -e EDITOR="vi" expense-monitoring-web-1 rails credentials:edit```
2. Attaching to the instance:
```
docker exec -it expense-monitoring-web-1 sh
```
2. Debugging rails server: You need to attach on the docker container before you hit the binding.pry then run the command below:
```
docker attach expense-monitoring-web-1 sh
```

Architecture Decisions:
1. Used https://github.com/akhil-gautam/nextjs-on-rails as a starting point as it mostly contain the functionality and technology requirements.
2. Decided to use docker to run the app for several reasons:
 - To avoid any OS dependencies on the versions of the packages and gems.
 - To have minimal changes and setup in the scenario that we want to deploy this app.
 - I'm using windows in developing this app
3. Sensitive ENV vars are hard coded on the dockerfile. In the scenario that we want to deploy this app we can move the env vars on the platform that we could use so that it could be properly maintained and protected
4.  User verification: By default user creation pass thru verification before having user to login but since we're gonna be managing users inside an authenticated environment I think verification would not be required.

How to Run:
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

## Dev Notes
Working with docker:
1. Updating rails credentials.
```docker exec -it -e EDITOR="vi" expense-monitoring-web-1 rails credentials:edit```
2. Debugging rails server: You need to attach on the docker container before you hit the binding.pry then run the command below:
```
docker attach expense-monitoring-web-1 sh
```

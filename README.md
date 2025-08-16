How to Run:
1. Ensure you have Docker and Docker Compose installed and running on your system.
2. Open a terminal or command prompt.
3. Navigate to the directory containing the `docker-compose.yml` file using the `cd` command.
4. Start the application using the following command:
   ```
   docker-compose up
   ```
5. To stop the application, use the following command:
   ```
   docker-compose down
   ```
6. Follow any additional instructions or input prompts provided by the application during execution.


Updating rails credentials.
`docker exec -it -e EDITOR="vi" expense-monitoring-web-1 rails credentials:edit`

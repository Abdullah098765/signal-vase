// scheduled-task.js
export default async function scheduledTask(req, res) {
      console.log('Scheduled task is running!');
      // Add your periodic task logic here
      res.status(200).send('Scheduled task completed.');
    }
    
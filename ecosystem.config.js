module.exports = {
    apps: [
        {
            name: 'eor-backend',  // Give a name to your app instance
            script: './main.js',  // Replace with your main entry point file (e.g., server.js or app.js)
            instances: 1,  // Number of instances to be run. "max" uses all available CPUs
            autorestart: true,
            watch: false,  // Use true if you want PM2 to watch for file changes (dev only)
            max_memory_restart: '1G',  // Restart if memory exceeds 1GB
            env: {
                NODE_ENV: 'production',
                PORT: 3000,  // Define your port or any other environment variables
            },
        },
    ],
};

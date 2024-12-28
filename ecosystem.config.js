module.exports = {
    apps: [
        {
            name: 'backend-server',
            script: '/home/site/wwwroot/main.js', // Use `next start` script to start the Next.js application
            args: 'start',  // Pass 'start' to run the Next.js app in production mode
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000, // Replace with your actual port
            },
        },
    ],
};

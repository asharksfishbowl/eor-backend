module.exports = {
    apps: [
        {
            name: 'eor-backend',
            script: 'node_modules/.bin/next',
            args: 'start',
            cwd: '/home/site/wwwroot', // The folder with package.json / .next
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};

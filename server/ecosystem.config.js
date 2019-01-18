module.exports = {
  apps: [
    {
      name: 'tech-jobs-ch-server',
      script: './src/index.ts',
      interpreter: './node_modules/.bin/ts-node',
      cwd: './',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      kill_timeout: 10000,
      wait_ready: true,
      watch: false,
      ignore_watch: ['node_modules'],
      watch_options: {
        usePolling: true
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G'
    }
  ]
}

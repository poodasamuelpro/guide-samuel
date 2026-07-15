module.exports = {
  apps: [
    {
      name: 'guide-samuel',
      script: 'node',
      args: '.next/standalone/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}

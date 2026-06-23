module.exports = {

  apps: [

    {

      name: "pamutec",

      script: "npm",

      args: "start",

      instances: 1,

      exec_mode: "fork",

      env: {

        PORT: 8042,

        NODE_ENV: "production",

      },

    },

  ],

};

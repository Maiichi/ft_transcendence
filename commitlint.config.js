module.exports = {
  plugins: [
    {
      rules: {
        scope: (props) => {
          let regex = /(FULL|BACK|FRONT$)/;
          return [
            regex.test(props.scope),
            "Your scope should include FRONT or BACK.\n   ",
          ];
        },
        typeEnum: (props) => {
          let regex = /(feat|fix$)/;
          return [
            regex.test(props.type),
            "Your type should include feat or fix.\n   For example feat(FRONT): commit message.\n ",
          ];
        },
      },
    },
  ],

  rules: {
    scope: [2, "always"],
    typeEnum: [2, "always"],
  },
};

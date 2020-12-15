const TEST_MODE = 'test';

const getCliArgValue = (argName) => {
  const argStart = `--${argName}=`;
  const arg = process.argv.find((arg) => arg.startsWith(argStart));
  return arg ? arg.slice(argStart.length) : arg;
};

const getAppUrl = () => {
  const tmAppUrl = getCliArgValue('APP_URL');
  if (tmAppUrl !== undefined) {
    return tmAppUrl;
  }

  const env = getCliArgValue('ENV');
  const appUrlMap = new Map([
    [undefined, process.env.APP_URL],
  ]);

  if (!appUrlMap.has(env)) {
    throw new Error('unknown ENV arg value');
  }
  return appUrlMap.get(env);
};

export {
  getAppUrl,
};

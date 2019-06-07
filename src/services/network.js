async function post(url) {
  try {
    return await fetch(url, { method: 'POST' });
  } catch (error) {
    console.log(error);
  }
}

export function builtinLed(value = 'on') {
  const order = `http://192.168.8.100:3000/api/native/builtin-led/${value}`;
  post(order);
}
export function escChange(value) {
  const order = `http://192.168.8.100:3000/api/native/esc/default/${value}`;
  post(order);
}
export function servoChange(value) {
  const order = `http://192.168.8.100:3000/api/native/move/default/${value}`;
  post(order);
}

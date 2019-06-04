function post(url) {
  console.log(url);
  fetch(url, { method: 'POST' })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

export function builtinLed(value = 'on') {
  const order = `http://192.168.8.101:3000/api/native/builtin-led/${value}`;
  post(order);
}
export function escChange(value) {
  const order = `http://192.168.8.101:3000/api/native/esc/default/${value}`;
  post(order);
}
export function servoChange(value) {
  const order = `http://192.168.8.101:3000/api/native/move/default/${value}`;
  post(order);
}

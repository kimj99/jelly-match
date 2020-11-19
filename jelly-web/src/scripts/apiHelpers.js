export function handleGet(endpoint) {
  return fetch(endpoint, {
    credentials: "include"
  }).then(response =>
    response.json()
  );
}

export function handlePost(endpoint, body) {
  return fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}

export function handleDelete(endpoint) {
  return fetch(endpoint, {
    method: "DELETE",
    credentials: "include"
  }).then(response =>
    response.json()
  );
}

export function handlePut(endpoint, body) {
  return fetch(endpoint, {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}
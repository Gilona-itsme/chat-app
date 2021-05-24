// const socket = io('ws://localhost:4040');

// const refs = {
//   chatForm: document.querySelector('.chat-box__form'),
//   messages: document.querySelector('.chat-box__messages'),
//   modal: document.querySelector('.chat-box__modal'),
//   closeModalBtn: document.querySelector('[data-action="close"]'),
//   overlay: document.querySelector('body'),
//   linkChat: document.querySelector('[data-modal-open]'),
// };

// const userName = 'Аноним';

// socket.emit('user/joinChat', userName);

// socket.on('user/joinChatSuccess', message => {
//   console.log(message);
// });

// socket.on('userJoined', message => {
//   console.log(message);

//   // socket.username = 'Anonymouse';
//   // console.log(socket.username + ' присоединился к чату ');
//   // socket.on('change_username', data => {
//   //   if (data.username == '') socket.username = 'Anonymouse';
//   //   else socket.username = data.username;

//   //   socket.broadcast.emit(
//   //     'chat message',
//   //     `<span class="username">A new User` +
//   //       socket.username +
//   //       `: Joined The Chatroom </span>`,
//   //   );
//   //   console.log('username = ' + data.username);
//   // });
// });

// socket.on('newMessage', appendMessageToFeed);

// socket.on('user/connected', history => {
//   const markup = history
//     .map(({ author, message, timestamp }) => {
//       const { hours, minutes } = getTime(timestamp);

//       return `<li>
//         <b>${author}</b> ${hours}:${minutes}
//         <p>${message}</p>
//       </li>`;
//     })
//     .join('');

//   refs.messages.insertAdjacentHTML('beforeend', markup);
// });

// refs.chatForm.addEventListener('submit', onChatSubmit);

// function onChatSubmit(event) {
//   event.preventDefault();

//   socket.emit('newMessage', event.currentTarget.elements.message.value);
//   event.currentTarget.elements.message.value = '';
// }

// function appendMessageToFeed({ author, message, timestamp }) {
//   const { hours, minutes } = getTime(timestamp);

//   const markup = `
//   <li>
//     <b>${author}</b> ${hours}:${minutes}
//     <p>${message}</p>
//   </li>`;

//   refs.messages.insertAdjacentHTML('beforeend', markup);
//   refs.messages.scrollTop = refs.messages.scrollHeight;
// }

// function getTime(timestamp) {
//   const time = new Date(timestamp);
//   const hours = time.getHours();
//   const minutes = this.pad(time.getMinutes());

//   return { hours, minutes };
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// refs.linkChat.addEventListener('click', toggleModal);

// function toggleModal(event) {
//   event.preventDefault();

//   refs.modal.classList.toggle('is-open');
// }

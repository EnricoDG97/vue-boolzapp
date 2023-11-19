const { DateTime } = luxon;
const dt = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      // aggiungo indice contatto attivo e imposto default a 0
      activeContactIndex: 0,
      newMessage: "",
      // testo vuoto per la ricerca di un contatto 
      searchText: "",
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro B.',
          avatar: '_4',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro L.',
          avatar: '_5',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          avatar: '_6',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          avatar: '_7',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          avatar: '_8',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ],
    };
  },
  methods: {
    // funzione per settare un indice al contatto attivo
    setActiveContact(index) {
      this.activeContactIndex = index;
    },
    // funzione per inviare un nuovo messaggio (oggetto)
    sendNewMessage() {
      this.contacts[this.activeContactIndex].messages.push({
        date: "",
        message: this.newMessage,
        status: "sent",
      });
      // resetto il campo dopo il push
      this.newMessage = '';
      // setto un timeout di 1 secondo per l'invio di un messaggio automatico con classe/status received dopo aver inviato il primo messaggio - uso di arrow function per funzionare
      setTimeout(() => {
        this.contacts[this.activeContactIndex].messages.push({
          date: "",
          message: 'Ok',
          status: 'received',
        });
      }, 1000);
    },
    // funzione di ricerca di un testo tra i contatti
    researchContact() {
      const searchedText = this.searchText.toLowerCase().trim();
      this.contacts.forEach((contact) => {
        const contactName = contact.name.toLowerCase();
        contact.visible = contactName.includes(searchedText);
      });
    },
    // funzione elimina il messaggio
    destroyMessage(contactIndex, messageIndex) {
      this.contacts[contactIndex].messages.splice(messageIndex, 1);
    },
    // funzione per trasformare il dato testuale in formato di data con luxon
    dateToHourMin(fullDate) {
      const luxonDate = dt.fromFormat(fullDate, "dd/MM/yyyy HH:mm:ss");
      return luxonDate.toFormat("HH:mm");
    },
    // funzione per abbreviazione ultimo messaggio visualizzato nel contatto
    abbreviateMessage(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      if (lastMessage) {
          return lastMessage.message.length > 15 ? `${lastMessage.message.slice(0, 15)}...` : lastMessage.message;
      }
      return '';
    },
    // funzione per visualizzare l'orario dell'ultimo messaggio inviato
    lastMessageTime(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      if (lastMessage) {
          return this.dateToHourMin(lastMessage.date);
      }
      return '';
    },
  },
}).mount('#app');
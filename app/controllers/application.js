import Controller from '@ember/controller';


export default Controller.extend({
  
  
  init(){
    this._super();
    // create demo entries
    let u1 = this.store.createRecord('user', {"id": 1, 'name': "ana",
     "phone": 12312123123, 
     "avatarUrl": "https://images.clipartlogo.com/files/istock/previews/9984/99842419-happy-asian-girls-icon-vector-young-woman-icon-illustration.jpg"});
    let u2 = this.store.createRecord('user', {"id": 2, 'name': "victor",
     "phone": 1234213123, 
     "avatarUrl": "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg"});
    let u3 = this.store.createRecord('user', {"id": 3, 'name': "cristy",
     "phone": 1234213123, 
     "avatarUrl": "https://images.clipartlogo.com/files/istock/previews/9984/99842419-happy-asian-girls-icon-vector-young-woman-icon-illustration.jpg"});
    let u4 = this.store.createRecord('user', {"id": 4, 'name': "nico",
     "phone": 1234213123, 
     "avatarUrl": "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg"});
    let u5 = this.store.createRecord('user', {"id": 5, 'name': "thomas",
     "phone": 1234213123, 
     "avatarUrl": "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg"});
    let u6 = this.store.createRecord('user', {"id": 6, 'name': "juli",
     "phone": 1234213123, 
     "avatarUrl": "https://images.clipartlogo.com/files/istock/previews/9984/99842419-happy-asian-girls-icon-vector-young-woman-icon-illustration.jpg"});

    let s1 = this.store.createRecord('seller', {"id": 1, "user": u6, "commision": 0.20})

    let c1 = this.store.createRecord('client', {"id": 1, "user":u1, "seller": s1, "old_consumer": true})
    let c2 = this.store.createRecord('client', {"id": 2, "user":u2, "seller": s1, "old_consumer": true})
    let c3 = this.store.createRecord('client', {"id": 3, "user":u3, "seller": s1, "old_consumer": true})
    let c4 = this.store.createRecord('client', {"id": 4, "user":u4, "seller": s1, "old_consumer": true})
    let c5 = this.store.createRecord('client', {"id": 5, "user":u5, "seller": s1, "old_consumer": true})
    
    
    let i1 = this.store.createRecord('item', {"id": 1, "name": "some thing", "price": 3, "imageUrl": "https://via.placeholder.com/150x150"})
    let i2 = this.store.createRecord('item', {"id": 2, "name": "another thing", "price": 3, "imageUrl": "https://via.placeholder.com/150x150"})
    let i3 = this.store.createRecord('item', {"id": 3, "name": "expensive thing", "price": 15, "imageUrl": "https://via.placeholder.com/150x150"})
    let i4 = this.store.createRecord('item', {"id": 4, "name": "last thing", "price": 6, "imageUrl": "https://via.placeholder.com/150x150"})
   
    this.store.createRecord('order', {
        "id": 1, 
        "seller": s1,
        "name": "order 1", 
        "date": new Date(2018, 4, 10),
        "client": c1,
       "items": [i1, i3]
    });	
    this.store.createRecord('order', {
        "id": 2, 
        "seller": s1,
        "name": "order 2", 
        "date": new Date(2018, 6, 12),
        "client": c2,
        "items": [i1, i3, i2]
    });	
    this.store.createRecord('order', {
        "id": 3, 
        "seller": s1,
        "name": "order 3", 
        "quantity": 3, 
        "date": new Date(2018, 5, 3),
        "client": c1,
        "items": [i4, i3]
    });	
    this.store.createRecord('order', {
        "id": 4, 
        "seller": s1,
        "name": "order 4", 
        "date": new Date(2018, 3, 12),
        "client": c1,
        "items": [i4, i1, i3, i2]
    });	
    
     let content1 = this.store.createRecord('content', {"id": 1, "name": "Video intro", "imageUrl": "https://via.placeholder.com/150x150", "thumbnailUrl": "https://via.placeholder.com/150x150"});
     let content2 = this.store.createRecord('content', {"id": 2, "name": "Horoscopo aries", "imageUrl": "https://via.placeholder.com/150x150", "thumbnailUrl": "https://via.placeholder.com/150x150"});
     let content3 = this.store.createRecord('content', {"id": 3, "name": "Video intro 2", "imageUrl": "https://via.placeholder.com/150x150", "thumbnailUrl": "https://via.placeholder.com/150x150"});
     let content4 = this.store.createRecord('content', {"id": 4, "name": "Catalogo 13 cortado", "imageUrl": "https://via.placeholder.com/150x150", "thumbnailUrl": "https://via.placeholder.com/150x150"});
     
     let task1 = this.store.createRecord('task', {
        "id": 1, 
        "seller": s1,
        "description": "Envia a 2 personas", 
        "date": new Date(2018, 3, 12),
        "num_to_send": 2,
        "content": content1,
         "when_done": new Date(2018, 3, 12)
    });	
     
     this.store.createRecord('task', {
        "id": 2, 
        "seller": s1,
        "description": "Comparte el catalogo por SoMe", 
        "date": new Date(2018, 3, 12),
        "num_to_send": 0,
        "content": content4,
         "when_done": new Date(2018, 3, 12)
    });	
    
    this.store.createRecord('task', {
        "id": 3, 
        "seller": s1,
        "description": "Comparte el video intro 2 por SoMe", 
        "date": new Date(2018, 3, 12),
        "num_to_send": 0,
        "done": true,
        "content": content3,
         "when_done": new Date(2018, 3, 12)
    });	
    
    this.store.createRecord('suggested_client', {
        "id": 1, "task": task1, "client": c3, "priorized": true,
         "text": "Hola, mira este contenido para ti :D"
    });	
    
    this.store.createRecord('suggested_client', {
        "id": 2, "task": task1, "client": c2, "priorized": true,
         "text": "Hola, mira este contenido para ti :D"
    });	
    
    this.store.createRecord('suggested_client', {
        "id": 3, "task": task1, "client": c5, "priorized": false,
         "text": "Hola, mira este contenido para ti :D"
    });	
    
    this.store.createRecord('suggested_client', {
        "id": 4, "task": task1, "client": c1, "priorized": false,
         "text": "Hola, mira este contenido para ti :D"
    });	
    
  },

  transitionHistory: [],
  transitioningToBack: false,
  
  actions: {
    // Note that an action, like 'back', may be called from any child!  Like back below, for example.

    willTransition: function(transition) {
      if (!this.get('transitioningToBack')) {
        this.get('transitionHistory').push(window.location.pathname);
      }
      this.set('transitioningToBack', false);
    },
    
    back: function() {
      var last = this.get('transitionHistory').pop();
      last = last ? last : '/dash';
      this.set('transitioningToBack', true);
      this.transitionTo(last);
    }
  }
});

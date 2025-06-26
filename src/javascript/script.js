class Kanban {
  constructor(columns,cards){
    this.columns = document.querySelectorAll(columns);
    this.cards = document.querySelectorAll(cards);
  };

  bind(){
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  };

  addEvent(){
    this.cards.forEach(card =>{
      card.addEventListener('dragstart',this.dragStart);
      card.addEventListener('dragend',this.dragEnd);
    });
    this.columns.forEach(column =>{
      column.addEventListener('dragover', this.dragOver);
      column.addEventListener('dragleave', this.dragLeave);
      column.addEventListener('drop', this.drop);
    });
  };

  dragStart(event){
    event.currentTarget.classList.add('dragging');
  };

  dragEnd(event){
    event.currentTarget.classList.remove('dragging');
  };

  dragOver(event){
    event.preventDefault();
    event.currentTarget.classList.add('cards-hover');
  };

  dragLeave(event){
    event.currentTarget.classList.remove('cards-hover');
  };

  drop(event){
    event.currentTarget.classList.remove('cards-hover');
    const dragCard = document.querySelector('.kanban-card.dragging');
    event.currentTarget.appendChild(dragCard);
    let e = event.currentTarget.lastElementChild.lastElementChild;
    if(dragCard.parentElement === this.columns[0]){
      e.classList.remove('blue','green');
      e.classList.add('red');
    }else if(dragCard.parentElement === this.columns[1]){
      e.classList.remove('red','green');
      e.classList.add('blue');
    }else if(dragCard.parentElement === this.columns[2]){
      e.classList.remove('red','blue');
      e.classList.add('green');
    };
  };

  init(){
    this.bind();
    this.addEvent();
  }
};



const kanban = new Kanban('.kanban-cards', '.kanban-card');
kanban.init();
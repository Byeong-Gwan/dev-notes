import { $, qsa, each, pluralization, on, delegate, parent, nodeListEach } from './helpers.js';

// 키보드의 특정 키가 눌렸을 때 동작을 제어하기 위한 키 코드값 상수 선언
const ENTER_KEY = 13;
const ESC_KEY = 27;

// 앱의 초기 상태를 세팅하고, 로컬스토리지에 저장되는 데이터를 관리하는 구조를 포함
class App{
  constructor ( localStorageKey ) {

    // Stores라는 별도 객체가 로컬스토리지에 데이터를 저장/조회/삭제하는 역할을 담당
    this.stores = new Stores(localStorageKey);
    this.currentId = 0; // 현재 수정 중인 아이템 ID 등 추적 용도로 사용
    
    // DOM 요소 연결
    this.$insert = $('#js-insert');
    this.$toggleAll = $('#js-toggle-all'); 
    this.$bar = $('#js-bar');
    this.$list = $('#js-list');
    this.$clearCompleted = $('#js-clear-completed');
    this.$total = $('#js-total');
    this.$filters = $('#js-filters');
  
  
    this.addEventListeners(); // 입력, 버튼 클릭 등 이벤트 연결
    this.render(); // 화면 초기 렌더링 실행
  
  }


  addEventListeners () {

    on(this.$insert, 'keypress', this.onInsert.bind(this));

    on(this.$toggleAll, 'click', this.onToggleAll.bind(this));
    delegate(this.$list, '.toggle', 'click', this.onToggle.bind(this));

    delegate(this.$list, '.destroy', 'click', this.onDestroy.bind(this) );

    on(this.$clearCompleted, 'click', this.onClearCompleted.bind(this));


    delegate(this.$filters, '.button', 'click', this.onFilter.bind(this));

    delegate(this.$list, 'span', 'dblclick', this.onStartEditing.bind(this));
    delegate(this.$list, '.edit', 'keyup', this.onEditingCancel.bind(this));
    delegate(this.$list, '.edit', 'keypress', this.onEditingDone.bind(this));
    delegate(this.$list, '.edit', 'blur', this.onEditingLeave.bind(this) );
  };

  onStartEditing (event) {
    const li = parent(event.target, 'li');
    const element = $('.edit', li);
    this.currentId = parseInt(li.dataset.id, 10);
    li.className += ' editing';
    element.value = event.target.innerHTML;
    element.focus();
  };

  onEditingCancel (event) {
    if( event.keyCode === ESC_KEY ) {
      console.log('onEditingCancel', event.target);
      event.target.dataset.isCanceled = true;
      event.target.blur();
    }
  };

  onEditingDone (event) {
    if( event.keyCode === ENTER_KEY ) {
      event.target.blur();
    }
  };

  onEditingLeave (event) {
    console.log('onEditingLeave');
    const input = event.target;
    const id = this.getItemId( input );
    const text = input.value.trim();
    const li = this.getElementByDataId( id );
    if( input.value.trim() ) {
      let item = {
        id: id,
        text: text
      };
      this.stores.save(item,this.endEditing.bind(this, li, text));
    } else {
      if( input.dataset.isCanceled ) {
        this.endEditing( li );
      } else {
        this.destroy( id );
      }
    }
  };

  endEditing ( li, text ) {
    li.className = li.className.replace('editing', '');
    $('.edit', li).removeAttribute('data-is-canceled');
    if( text ) {
      $('span', li).innerHTML = text;
    }
  };

  getItemId ( element ) {
    const li = parent(element, 'li');
    return parseInt(li.dataset.id, 10);
  };

  getElementByDataId ( id ) {
    return $('[data-id="' + id + '"]');
  };

  onInsert ( event ) {
    let element = event.target;
    const text = element.value.trim();
    if( text && event.keyCode === ENTER_KEY ) {
      this.insert(text);
      element.value = '';
    }
  };

  onToggleAll (event) {
    const checked = event.target.checked;
    const self = this;

    this.stores.findAll(function( items ) {
      $.each( items, function( item ) {
        item.completed = checked;
        self.stores.save( item, $.noop);
      });
      self.render();
    });
  };

  onToggle (event) {
    const element = event.target;
    const id = this.getItemId( element );
    const item = {
      id: id,
      completed: element.checked
    };
    this.stores.save( item, function(item) {
      const li = this.getElementByDataId( item.id );
      li.className = item.completed ? 'completed' : '';
      $('.toggle', li).checked = item.completed;
      this.showControls();
    }.bind(this));
  };

  onDestroy (event) {
    const id = this.getItemId( event.target );
    this.destroy( id );
  };

  onClearCompleted (event) {
    const self = this;
    this.stores.findAll(function( items ) {
      items = items
        .filter(function( item ) {
          return item.completed;
        })
        .forEach(function( item ) {
          self.destroy( item.id );
        });
    });
  };

  onFilter (event) {
    document.location.hash = event.target.getAttribute('href');
    this.render();
  };

  // Insert
  insert ( text ) {
    const item = {
      text: text,
      completed: false
    };
    this.stores.save(item, function( item ) {
      const element = this.nodeItem( item );
      this.$list.appendChild( element );
      this.showControls();
    }.bind(this));
  };

  // Destroy
  destroy ( id ) {
    this.stores.destroy( id, function() {
      const li = this.getElementByDataId( id );
      this.$list.removeChild(li);
      this.showControls();
    }.bind(this));
  };

  filter () {
    const hash = document.location.hash;
    const buttons = qsa('.button', this.$filters);
    if( !hash ) return false;
    nodeListEach(buttons, (button) => {
      if(button.getAttribute('href') === hash) {
        button.className = 'button selected';
      } else {
        button.className = button.className.replace('selected', '');
      }
    });

    const filterHash = hash.split('#/')[1]
    return filterHash !== 'all' ? filterHash : false;
  };

  // Render
  render () {

    const filter = this.filter();

    this.stores.findAll(function(items){
      if( filter ) {
        items = items
          .filter(function(item) {
            return item.completed === ( filter === 'completed' );
          });
      }
      const nodes = this.nodeItemMulti( items );
      this.$list.innerHTML = "";
      this.$list.appendChild(nodes);
      this.showControls();

    }.bind(this));

  };


  showControls () {
    this.stores.findAll(function(items){
      this.showBarAndToggleAll( items );
      this.showTotalTasksLeft( items );
      this.showClearCompleted( items );
    }.bind(this));
  };

  showBarAndToggleAll ( items ) {
    const total = items.length;
    const completed = items.filter(function(item){
      return item.completed;
    });
    const value = total ? 'block' : 'none';
    this.$toggleAll.style.display = value;
    this.$toggleAll.checked = total === completed.length;
    this.$bar.style.display = value;
  };

  showTotalTasksLeft (items) {
    items = items
      .filter(function( item ) {
        return !item.completed;
      });
    const len = items.length;
    const text = [len,' item', pluralization( len ),' left'].join('');
    this.$total.innerHTML = text;
  };

  showClearCompleted (items) {
    const some = items
      .some(function( item ) {
        return item.completed;
      });
    this.$clearCompleted.style.display = some ? 'inline-block' : 'none';
  };

  nodeItemMulti ( items ) {
    const fragment = document.createDocumentFragment();
    each( items, function( item ) {
      fragment.appendChild( this.nodeItem(item) );
    }.bind(this));
    return fragment;
  };

  nodeItem ( item ) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const toggle = document.createElement('input');
    const span = document.createElement('span');
    const destroy = document.createElement('button');
    const edit = document.createElement('input');

    li.setAttribute('data-id', item.id );

    if ( item.completed ) {
      li.className = 'completed';
    }

    div.className = 'todo';

    toggle.setAttribute('type', 'checkbox');
    toggle.className = 'toggle';
    toggle.checked = item.completed;

    span.appendChild( document.createTextNode(item.text) );

    destroy.className = 'destroy';
    // destroy.appendChild( document.createTextNode('X') );

    edit.setAttribute('type', 'text');
    edit.className = 'edit';


    div.appendChild(toggle);
    div.appendChild(span);
    div.appendChild(destroy);

    li.appendChild(div);
    li.appendChild(edit);

    return li;
  }
}
// Initialization on Dom Ready
window.addEventListener('DOMContentLoaded', function() {
  const app = new App('todo');
});



import React from 'react';
import { Panel, Placeholder, PanelHeader, PanelHeaderBack, Button, FormLayout, Checkbox, Cell, Group, Spinner, Separator,
         File, FormLayoutGroup, Input, Textarea, Select, Div, Card, FixedLayout, Avatar, Header, CellButton, Search, HorizontalScroll } from '@vkontakte/vkui';


import './Map.css';
import { YMaps, Map, Placemark, Circle } from 'react-yandex-maps';
import HappyIcon from '../../img/001-happy.svg';
import CryingIcon from'../../img/003-crying.svg';
import CoolIcon from '../../img/017-cool.svg';
import CalmIcon from '../../img/050-calm.svg';
import SleepingIcon from '../../img/021-sleeping.svg';
import AngryIcon from '../../img/004-angry.svg';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';

const circles = [
  {
    geometry: [[55.76, 37.6], 5000],
    image: CoolIcon,
    mood: 'cool'
  },
  {
    geometry: [[55.67, 37.64], 4200],
    image: HappyIcon,
    mood: 'happy'
  },
  {
    geometry: [[55.73, 37.755], 3800],
    image: SleepingIcon,
    mood: 'tired'
  },

  {
    geometry: [[56.06, 37.8], 4200],
    image: AngryIcon,
    mood: 'angry'
  },
  {
    geometry: [[55.97, 37.84], 5000],
    image: CryingIcon,
    mood: 'sad'
  },
  {
    geometry: [[56.03, 37.955], 3800],
    image: CalmIcon,
    mood: 'calm'
  }
]

const moods = {
  'cool': 'Энергичное',
  'happy': 'Весёлое',
  'tired': 'Уставшее',
  'angry': 'Агрессивное',
  'sad': 'Грустное',
  'calm': 'Спокойное'
}


const AppMap = (props) => {
  let height = `calc(${window.innerHeight}px - 120px - var(--safe-area-inset-top)`;
  return (
    <YMaps>
      <Map state={{ center: props.coords, zoom: 10 }} height={height} width='100%'>
        {
          circles.map((item, i) => {
            return (
              <Circle geometry={item.geometry}
                options={{
                  draggable: false,
                  fillImageHref: item.image,
                  strokeColor: '#000000',
                  strokeOpacity: 0.2,
                  fillOpacity: 0.9,
                  strokeWidth: 2,
                }}
                onClick={() => props.go(item.mood)}
              />
            )
          })
        }
      </Map>
    </YMaps>
  )
};

const Mood = (props) => (
  <Button mode='tertiary' className='Mood' onClick={props.onClick}>
    <div>
      <Avatar size={64} src={props.src} style={{ background: 'var(--background_content)', paddingBottom: 4 }}/>
      <span style={{ marginTop: 4 }}>{props.name}</span>
    </div>
  </Button>
)


class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  go = (mood) => {
    this.props.data.mood = mood;
    this.props.commit(this.props.data);
    this.props.go('newsfeed');
  }

  setCoords = (coords) => {
    this.props.data.coords = coords;
    this.props.commit(this.props.data);
  }

  render() {
    let search = this.state.search.toLowerCase();

    let moodCards = [];
    {
      circles.map((item, i) => {
        if (moods[item.mood].toLowerCase().indexOf(search) > -1) {
          moodCards.push(<Mood src={item.image} name={moods[item.mood]} key={i} onClick={() => this.setCoords(item.geometry[0])}/>)
        }
        return
      })
    }

    return (
      <Panel id={this.props.id} separator={false}>
        <FixedLayout vertical='top'>
          <div style={{ position: 'absolute', padding: 2, right: 0 }}>
            <Button className='Button-exit' mode='tertiary' onClick={this.props.goBack}><Icon24DismissDark/></Button>
          </div>
        </FixedLayout>
        <AppMap coords={this.props.data.coords} go={this.go}/>
        <FixedLayout vertical='bottom' filled style={{ borderRadius: 10 }}>
            <Search placeholder='Поиск по настроению' onChange={e => {this.setState({ search: e.target.value })}}/>
            <HorizontalScroll style={{ height: 93, paddingBottom: 18 }}>
              <div style={{ display: 'flex', paddingRight: 6, paddingLeft: 6, overflowY: 'hidden', height: 98 }}>
                {moodCards}
              </div>
            </HorizontalScroll>
        </FixedLayout>
      </Panel>
    )
  }
}

export default Editor;

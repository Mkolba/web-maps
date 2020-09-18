import React from 'react';
import { Panel, Placeholder, PanelHeader, PanelHeaderBack, Button, FormLayout, Checkbox, Cell, Group, Spinner, Separator,
         File, FormLayoutGroup, Input, Textarea, Select, Div, Card, FixedLayout, Avatar, Header, CellButton } from '@vkontakte/vkui';
import Icon28GlobeOutline from '@vkontakte/icons/dist/28/globe_outline';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';


import {ReactComponent as HappyIcon} from '../img/001-happy.svg';
import {ReactComponent as CryingIcon} from'../img/003-crying.svg';
import {ReactComponent as CoolIcon} from '../img/017-cool.svg';
import {ReactComponent as CalmIcon} from '../img/050-calm.svg';
import {ReactComponent as SleepingIcon} from '../img/021-sleeping.svg';
import {ReactComponent as AngryIcon} from '../img/004-angry.svg';
import {ReactComponent as Icon24DismissDark} from '@vkontakte/icons/dist/24/dismiss_dark';


const moods = {
  'cool': <CoolIcon style={{ width: 96, height: 96 }} />,
  'happy': <HappyIcon style={{ width: 96, height: 96 }} />,
  'tired': <SleepingIcon style={{ width: 96, height: 96 }} />,
  'angry': <AngryIcon style={{ width: 96, height: 96 }} />,
  'sad': <CryingIcon style={{ width: 96, height: 96 }} />,
  'calm': <CalmIcon style={{ width: 96, height: 96 }} />
}


class Newsfeed extends React.Component {
  render() {

    return (
      <Panel id={this.props.id}>
        <PanelHeader left={this.props.mood && <PanelHeaderBack onClick={this.props.goBack}/>}>Новости</PanelHeader>

        {
          !this.props.mood ?
            <Placeholder icon={<Icon24Newsfeed width={96} height={96} fill='var(--button_primary_background)'/>} stretched>
              Давайте представим, что здесь располагается ваша лента новостей
            </Placeholder>
          :
            <Placeholder icon={moods[this.props.mood]} stretched>
              Давайте представим, что здесь располагается ваша лента новостей, составленная по выбранному настроению и геопозиции
            </Placeholder>
        }


        <FixedLayout vertical='bottom' style={{height: 68 }}>
          <div style={{ padding: 12, position: 'absolute', right: 0 }}>
            <Button onClick={!this.props.mood ? () => this.props.go('map') : this.props.goBack} style={{ width: 44, height: 44, borderRadius: '50%' }}>
              <Icon28GlobeOutline/>
            </Button>
          </div>
        </FixedLayout>

      </Panel>
    )
  }
}

export default Newsfeed;

import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import "../survey.css";
import MoodAwe from "./nobackgroundAwe copy.png"
import MoodSeriously from "./nobackgroundSeriously copy.png";
import MoodCringe from "./nobackgroundCringe copy.png";
import MoodDisgust from "./nobackgroundDisgust copy.png";
import MoodDrool from "./nobackgroundDrool copy.png";
import MoodHappy from "./nobackgroundHappy copy.png";
import MoodLove from "./nobackgroundLove copy.png";
import MoodMad from "./nobackgroundMad copy.png";
import MoodSad from "./nobackgroundSad copy.png";
import MoodWeep from "./nobackgroundWeep copy.png";
import MoodWHAAT from "./nobackgroundWhaat copy.png";
import MoodThinking from "./nobackgroundThinking copy.png";

const items = [
    {
    src: MoodAwe,
    altText: 'awe',
   
  },
  {
    src: MoodCringe,
    altText: ':cringe:',
  },
  {
    src: MoodDrool,
    altText: ':drool:',
    
  },
  {
    src: MoodSeriously,
    altText: ':seriously:',
    
  },
  {
    src: MoodLove ,
    altText: ':love:',
    
  }, 
  {
    src: MoodDisgust,
    altText: ':disgust:',
    // caption: ':disgust:',
    // header: ':disgust:'
  },
  {
    src: MoodMad,
    altText: ':mad:',
    
  },
  {
    src: MoodSad,
    altText: ':sad:',
    
  },
  {
    src: MoodWHAAT,
    altText: ':whaat:',
    
  },
  {
    src: MoodHappy,
    altText: ':happy:',
    
  },
  {
    src: MoodWeep,
    altText: ':weep:',
   
  },
  {
    src: MoodThinking,
    altText: ':thinking:',
    
  },
];

const MoodBotCarousel = () => <UncontrolledCarousel items={items} className="moodbot" />;

export default MoodBotCarousel;

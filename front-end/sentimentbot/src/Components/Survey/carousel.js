import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import "./survey.css";
import MoodAwe from "./Awe.jpg"
import MoodSeriously from "./Seriously.jpg";
import MoodCringe from "./Cringe.jpg";
import MoodDisgust from "./Disgust.jpg";
import MoodDrool from "./Drool.jpg";
import MoodHappy from "./Happy.jpg";
import MoodLove from "./Love.jpg";
import MoodMad from "./Mad.jpg";
import MoodSad from "./Sad.jpg";
import MoodWeep from "./Weep.jpg";
import MoodWHAAT from "./WHAAT.jpg";
import MoodThinking from "./Thinking.jpg";

const items = [
    {
    src: MoodAwe,
    altText: 'awe',
   
  },
  {
    src: MoodSeriously,
    altText: ':seriously:',
    
  },
  {
    src: MoodCringe,
    altText: ':cringe:',
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
    src: MoodDrool,
    altText: ':drool:',
    
  },
  {
    src: MoodLove ,
    altText: ':love:',
    
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
    src: MoodWeep,
    altText: ':weep:',
   
  },
  {
    src: MoodHappy,
    altText: ':happy:',
    
  },
  {
    src: MoodThinking,
    altText: ':thinking:',
    
  },
];

const MoodBotCarousel = () => <UncontrolledCarousel items={items} className="moodbot" />;

export default MoodBotCarousel;

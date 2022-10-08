import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function Example({props}) {
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();

  return (
    <div style={{width:80, height:80, background:'green'}}>
      <button onClick={() => speak({ text: props.data })}>Speak</button>
    </div>
  );
}
export default Example;
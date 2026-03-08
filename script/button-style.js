const buttonStyle = (btnName) => {
     const allButton = document.getElementById('allbutton');
     const openButton = document.getElementById('openbutton');
     const closedButton = document.getElementById('closedbutton');
     if(btnName === 'All'){
          allButton.classList.add('btn-primary')
          openButton.classList.remove('btn-success' ,'text-white')
          closedButton.classList.remove('btn-error' ,'text-white')
     }
     else if (btnName === 'Open'){
          allButton.classList.remove('btn-primary')
          openButton.classList.add('btn-success' ,'text-white')
          closedButton.classList.remove('btn-error' ,'text-white')

     }
     else if (btnName === 'Closed'){
           allButton.classList.remove('btn-primary')
          openButton.classList.remove('btn-success' ,'text-white')
          closedButton.classList.add('btn-error' ,'text-white')
     }
}

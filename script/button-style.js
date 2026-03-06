const buttonStyle = (btnName) => {
     const allButton = document.getElementById('allbutton');
     const openButton = document.getElementById('openbutton');
     const closedButton = document.getElementById('closedbutton');
     if(btnName === 'All'){
          allButton.classList.add('btn-primary')
          openButton.classList.remove('btn-primary')
          closedButton.classList.remove('btn-primary')
     }
     else if (btnName === 'Open'){
          allButton.classList.remove('btn-primary')
          openButton.classList.add('btn-primary')
          closedButton.classList.remove('btn-primary')

     }
     else if (btnName === 'Closed'){
           allButton.classList.remove('btn-primary')
          openButton.classList.remove('btn-primary')
          closedButton.classList.add('btn-primary')
     }
}

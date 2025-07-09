import ReactModal from 'react-modal';

// Set the app element for screen readers
if (typeof window !== 'undefined') {
  const appElement = document.getElementById('root');
  if (appElement) {
    ReactModal.setAppElement(appElement);
  }
}

export { ReactModal };
export default ReactModal; 
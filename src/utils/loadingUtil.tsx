import { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import LoadingModal from '@/components/loadingModal';

function createMountNode() {
  const container = document.createElement('div');
  container.id = 'deploy-center-portal-container';
  document.body.append(container);
  return container;
}

function getMountNode() {
  return (
    document.getElementById('deploy-center-portal-container')
    ?? createMountNode()
  );
}

let loadingCount = 0;
const mountNode = getMountNode();
const loadingModalDom = <LoadingModal container={mountNode} visible />;

export function showLoading() {
  loadingCount += 1;
  if (loadingCount > 1) {
    return;
  }

  ReactDOM.render(loadingModalDom, mountNode);
}

export function hideLoading() {
  loadingCount -= 1;
  if (loadingCount) {
    return;
  }

  ReactDOM.render(cloneElement(loadingModalDom, { visible: false }), mountNode);
  ReactDOM.unmountComponentAtNode(mountNode);
}

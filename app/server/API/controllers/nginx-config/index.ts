import { Controller } from '@app/server/API/types';
import {
  handleGetSites,
  handleAddSite,
  handleUpdateSite,
  handleRemoveSite,
  handleRebuildNginxConf,
} from './utils';

const getSites: Controller = async (req, res) => {
  return res.send(await handleGetSites());
};

const addSite: Controller = async (req, res) => {
  let { site } = req.body;

  return res.send(await handleAddSite(site));
};

const updateSite: Controller = async (req, res) => {
  let { site } = req.body;
  return res.send(await handleUpdateSite(site));
};

const removeSite: Controller = async (req, res) => {
  let { id } = req.body;
  return res.send(await handleRemoveSite(id));
};

const rebuildNginxConf: Controller = async (req, res) => {
  return res.send(await handleRebuildNginxConf());
};

export const nginxConfigController = {
  getSites,
  addSite,
  updateSite,
  removeSite,
  rebuildNginxConf,
};

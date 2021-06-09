import { network, routes } from '../../network';

export const getDataFromTMDatabaseBySource = async () => {
  try {
    const { data } = await network.get(`${routes.ThreatenMeDB}false`);
    return { data, status: 'OK' };
  } catch ({ message }) {
    console.log(
      'Error at getDataFromTMDatabaseBySource() at db.util.ts at ~line  3, ',
      message,
    );
    return { status: 'ERROR' };
  }
};

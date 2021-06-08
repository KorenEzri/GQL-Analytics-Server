import { network, routes } from '../../network';

export const getDataFromTMDatabaseBySource = async (source: string) => {
  try {
    // @ts-ignore
    const { data } = await network.get(routes.ThreatenMeDB[source]);
    return { data, status: 'OK' };
  } catch ({ message }) {
    console.log(
      'Error at getDataFromTMDatabaseBySource() at db.util.ts at ~line  3, ',
      message,
    );
    return { status: 'ERROR' };
  }
};

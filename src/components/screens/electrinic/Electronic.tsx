import { FC } from "react";
import styles from "./electronic.module.scss";
import { IElectronic } from "@/types/electronic.type";
import Loader from "@/components/ui/Loader/Loader";
import { imageLik } from "@/util/imageLinkHalper";
type TElectronicProps = {
  data: IElectronic | undefined;
};
const Electronic: FC<TElectronicProps> = ({ data }) => {
  return (
    <>
      {data ? (
        <div className={styles.videoContainer}>
          <video className="video" controls>
            <source type="video/mp4" src={imageLik(data.path)} />
          </video>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Electronic;

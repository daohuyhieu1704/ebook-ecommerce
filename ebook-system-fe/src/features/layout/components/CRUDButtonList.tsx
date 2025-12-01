import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PATH, hasHeaderBtn } from "../../../constants/common";
import { ActionItem, ActionWrapper } from "../LayoutHeader.style";
import {
  openDrawerRight,
  setIsUpdateForm,
  setSelectedRows,
} from "../layoutSlice";
import { selectPermissions } from "../../Login/LoginSlice";

export default function CRUDButtonList({ path }: { path: string }) {
  const dispatch = useAppDispatch();
  const activePermissions = useAppSelector(selectPermissions);

  const drawerOnOpenCreate = () => {
    dispatch(setIsUpdateForm(false));
    dispatch(openDrawerRight());
    dispatch(setSelectedRows([]));
  };

  const moduleName = path.split("/").filter(Boolean).pop();
  console.log(activePermissions, moduleName);

  const canCreate = activePermissions.some((slug: string) => {
    const hasCreateAction = slug.includes("create");
    const matchesModule = moduleName ? slug.includes(moduleName) : false;
    return hasCreateAction && matchesModule;
  });

  return (
    <>
      {canCreate ? (
        <ActionWrapper>
          <ActionItem onClick={drawerOnOpenCreate}>
            <PlusOutlined style={{ color: "green" }} />
          </ActionItem>
        </ActionWrapper>
      ) : (
        <></>
      )}
    </>
  );
}

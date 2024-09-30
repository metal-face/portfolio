import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

export default function ResponsiveDialog({ open, setOpen, children }: Props): ReactElement {
    const isDesktop: boolean = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Me in Washington, DC</DialogTitle>
                        <DialogDescription>
                            This is a picture of me that my buddy took, in front of the Abraham
                            Lincoln memorial in Washington, DC.
                        </DialogDescription>
                    </DialogHeader>
                    <div>{children}</div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} fadeFromIndex={1} snapPoints={[1]}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Me in Washington, DC</DrawerTitle>
                    <DrawerDescription>
                        This is a picture of me that my buddy took, in front of the Abraham Lincoln
                        memorial in Washington, DC.{" "}
                    </DrawerDescription>
                </DrawerHeader>
                <div>{children}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button className={"dark:text-black"} variant="outline">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

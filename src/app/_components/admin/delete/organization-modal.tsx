import { Trash } from "lucide-react";
import { client } from "@/app/_trpc/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface DeleteOrganizationModalProps {
  id: string;
}

export function DeleteOrganizationModal({ id }: DeleteOrganizationModalProps) {
  const { mutateAsync: deleteOrganization } =
    client.organization.deleteOrganization.useMutation({
      onSuccess: () => {
        toast({
          description: "Organization deleted successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error while deleting organization",
          description: error.message,
        });
      },
    });

  const handleDeleteRoute = async () => {
    await deleteOrganization(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            fleet data. id : {id}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteRoute()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

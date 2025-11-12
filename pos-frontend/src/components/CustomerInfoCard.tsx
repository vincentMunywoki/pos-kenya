import { Card } from "./ui/card";
import { User, Gift } from "lucide-react";
import { Badge } from "./ui/badge";

interface CustomerInfoCardProps {
  name: string;
  email: string;
  loyaltyPoints: number;
}

export const CustomerInfoCard = ({ name, email, loyaltyPoints }: CustomerInfoCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <Gift className="w-4 h-4 text-warning" />
            <Badge variant="secondary">
              {loyaltyPoints} Points
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

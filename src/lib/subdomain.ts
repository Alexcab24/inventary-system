




export function getSubdomain(req: any) {
  const host = req.headers.get('host') || "";
  const subdomain = host.split('.')[0];

  
  return subdomain; 
}

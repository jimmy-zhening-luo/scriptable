# Non-secret "key", placeholder token required to copy, even though the storage account is public.
C:\azcopy\azcopy.exe rm 'https://distpub.blob.core.windows.net/scriptable-blob/dist?sp=racwdli&st=2023-02-20T09:39:40Z&se=2023-09-08T16:39:40Z&sip=0.0.0.0-255.255.255.255&sv=2021-06-08&sr=c&sig=WWUW5V5I4b2InfSdP001Yihp1p2cDkk7XmaUN0N9JZw%3D' --recursive

C:\azcopy\azcopy.exe copy 'C:\Users\zluo\code\scriptable-wild\dist' 'https://distpub.blob.core.windows.net/scriptable-blob?sp=racwdli&st=2023-02-20T09:39:40Z&se=2023-09-08T16:39:40Z&sip=0.0.0.0-255.255.255.255&sv=2021-06-08&sr=c&sig=WWUW5V5I4b2InfSdP001Yihp1p2cDkk7XmaUN0N9JZw%3D' --recursive;
